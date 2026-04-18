package hcmut.online_examination.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidExamPasscodeException extends RuntimeException {
    public InvalidExamPasscodeException() {
        super("Invalid exam passcode");
    }
}
