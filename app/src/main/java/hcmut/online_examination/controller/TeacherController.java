package hcmut.online_examination.controller;

import hcmut.online_examination.entity.Test;
import hcmut.online_examination.service.TestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
@CrossOrigin
public class TeacherController {

    private final TestService service;

    public TeacherController(TestService service) {
        this.service = service;
    }

    @PostMapping
    public Test createTest(@RequestBody Test test) {
        return service.create(test);
    }

    @GetMapping
    public List<Test> getTests() {
        return service.getAll();
    }
}