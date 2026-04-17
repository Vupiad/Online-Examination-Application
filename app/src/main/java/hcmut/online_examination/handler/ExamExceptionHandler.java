package hcmut.online_examination.handler;

import hcmut.online_examination.exception.DuplicateExamCodeException;
import hcmut.online_examination.exception.ExamNotFoundException;
import hcmut.online_examination.exception.ForbiddenException;
import hcmut.online_examination.exception.InvalidExamPasscodeException;
import hcmut.online_examination.exception.MaxAttemptsExceededException;
import hcmut.online_examination.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExamExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, Object> handleValidationException(MethodArgumentNotValidException e) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : e.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage() != null ? error.getDefaultMessage() : "invalid");
        }
        
        return Map.of(
                "code", "VALIDATION_ERROR",
                "message", fieldErrors
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> onUserNotFound(UserNotFoundException e) {
        return Map.of(
                "code", "USER_NOT_FOUND",
                "message", e.getMessage()
        );
    }

    // 🔥 NEW

    @ExceptionHandler(ExamNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> onExamNotFound(ExamNotFoundException e) {
        return Map.of(
                "code", "EXAM_NOT_FOUND",
                "message", e.getMessage()
        );
    }

    @ExceptionHandler(InvalidExamPasscodeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> onInvalidExamPasscode(InvalidExamPasscodeException e) {
        return Map.of(
                "code", "INVALID_EXAM_PASSCODE",
                "message", e.getMessage()
        );
    }

    @ExceptionHandler(DuplicateExamCodeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> onDuplicateExamCode(DuplicateExamCodeException e) {
        return Map.of(
                "code", "DUPLICATE_EXAM_CODE",
                "message", e.getMessage()
        );
    }

    @ExceptionHandler(MaxAttemptsExceededException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> onMaxAttemptsExceeded(MaxAttemptsExceededException e) {
        return Map.of(
                "code", "MAX_ATTEMPTS_EXCEEDED",
                "message", e.getMessage()
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> onIllegalArgument(IllegalArgumentException e) {
        return Map.of(
                "code", "ILLEGAL_ARGUMENT",
                "message", e.getMessage()
        );
    }

    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, String> onForbidden(ForbiddenException e) {
        return Map.of(
                "code", "FORBIDDEN",
                "message", e.getMessage()
        );
    }
}
