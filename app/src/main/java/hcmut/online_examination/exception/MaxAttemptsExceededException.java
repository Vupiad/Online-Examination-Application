package hcmut.online_examination.exception;

public class MaxAttemptsExceededException extends RuntimeException {
    public MaxAttemptsExceededException() {
        super("Max attempts exceeded");
    }
}
