package hcmut.online_examination.controller;

import hcmut.online_examination.entity.BankQuestionEntity;
import hcmut.online_examination.service.QuestionBankService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question-bank")
@RequiredArgsConstructor
public class QuestionBankController {

    private final QuestionBankService questionBankService;

    @GetMapping("/owner/{ownerId}")
    public List<BankQuestionEntity> getQuestions(@PathVariable Long ownerId) {
        return questionBankService.getByOwner(ownerId);
    }

    @PostMapping("/save")
    public BankQuestionEntity saveToBank(@RequestParam Long ownerId, @RequestBody BankQuestionEntity question) {
        return questionBankService.saveToBank(ownerId, question);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        questionBankService.deleteFromBank(id);
    }
}
