package hcmut.online_examination.service;

import hcmut.online_examination.dto.request.CreateTestRequest;
import hcmut.online_examination.dto.response.TestSummaryResponse;
import hcmut.online_examination.entity.Option;
import hcmut.online_examination.entity.Question;
import hcmut.online_examination.entity.Test;
import hcmut.online_examination.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;

    @Transactional
    public Test createTest(String instructorId, CreateTestRequest request) {

        // 1. Tạo Test
        Test test = Test.builder()
                .title(request.title())
                .durationMinutes(request.durationMinutes())
                .startTime(request.startTime())
                .endTime(request.endTime())
                .passcode(request.passcode())
                .build();

        // 2. Map Questions & Options (THEO DB THẬT)
        if (request.questions() != null) {
            List<Question> questions = request.questions().stream().map(qDto -> {

                Question question = Question.builder()
                        .test(test)
                        .content(qDto.content())
                        .points(qDto.points() != null 
                                ? qDto.points() 
                                : BigDecimal.valueOf(1.0)) // default
                        .build();

                // Map options
                if (qDto.options() != null) {
                    List<Option> options = qDto.options().stream().map(oDto ->
                            Option.builder()
                                    .question(question)
                                    .content(oDto.content())
                                    .isCorrect(oDto.isCorrect())
                                    .build()
                    ).toList();

                    question.setOptions(options);
                }

                return question;
            }).toList();

            test.setQuestions(questions);
        }

        // 3. Save
        return testRepository.save(test);
    }

    @Transactional(readOnly = true)
    public Page<TestSummaryResponse> getTestsByInstructor(String instructorId, String status, Pageable pageable) {

        Page<Test> testPage;

        if (status != null && !status.isEmpty()) {
            testPage = testRepository.findByInstructorIdAndStatus(instructorId, status, pageable);
        } else {
            testPage = testRepository.findByInstructorId(instructorId, pageable);
        }

        return testPage.map(test -> new TestSummaryResponse(
                test.getId(),
                test.getTitle(),
                test.getDurationMinutes(),
                test.getQuestions() != null ? test.getQuestions().size() : 0
        ));
    }
}