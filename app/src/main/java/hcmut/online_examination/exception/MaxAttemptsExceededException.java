package hcmut.online_examination.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class MaxAttemptsExceededException extends RuntimeException {
    public MaxAttemptsExceededException() {
        super("Max attempts exceeded");
    }
}
