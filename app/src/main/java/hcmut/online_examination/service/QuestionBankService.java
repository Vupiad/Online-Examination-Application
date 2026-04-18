package hcmut.online_examination.service;

import hcmut.online_examination.entity.*;
import hcmut.online_examination.repository.BankQuestionRepository;
import hcmut.online_examination.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionBankService {

    private final BankQuestionRepository bankQuestionRepository;
    private final UserRepository userRepository;

    public List<BankQuestionEntity> getByOwner(Long ownerId) {
        User user = userRepository.findById(ownerId).orElseThrow();
        return bankQuestionRepository.findAllByOwner(user);
    }

    @Transactional
    public BankQuestionEntity saveToBank(Long ownerId, BankQuestionEntity question) {
        User user = userRepository.findById(ownerId).orElseThrow();
        question.setOwner(user);
        return bankQuestionRepository.save(question);
    }

    @Transactional
    public void deleteFromBank(Long questionId) {
        bankQuestionRepository.deleteById(questionId);
    }
}
