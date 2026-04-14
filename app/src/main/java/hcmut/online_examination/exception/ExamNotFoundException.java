package hcmut.online_examination.exception;

public class ExamNotFoundException extends RuntimeException {
    public ExamNotFoundException() {
        super("Exam not found");
    }
}
