package hcmut.online_examination.exception;

public class DuplicateExamCodeException extends RuntimeException {
    public DuplicateExamCodeException() {
        super("Duplicate Exam Code");
    }
}
