package hcmut.online_examination.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ExamNotFoundException extends RuntimeException {
    public ExamNotFoundException() {
        super("Exam not found");
    }
}
