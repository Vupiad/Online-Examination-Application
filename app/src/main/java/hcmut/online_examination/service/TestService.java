package hcmut.online_examination.service;

import hcmut.online_examination.entity.Test;
import hcmut.online_examination.repository.TestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {

    private final TestRepository repo;

    public TestService(TestRepository repo) {
        this.repo = repo;
    }

    public Test create(Test test) {
        return repo.save(test);
    }

    public List<Test> getAll() {
        return repo.findAll();
    }
}