export const findError = res => res.status(500).json({
    status: 500,
    error: "Something went wrong!"
});
export const serverFeedback = (res, status, ...[statusKey, statusResult,msgkey,message, Key, Value]) => res.status(status).json({
    [statusKey]: statusResult,
    [msgkey]: message,
    [Key]: Value
});
export const authFeedback = (res, status, ...[statusKey, statusResult,msgkey,message, Key, Value]) => res.status(status).json({
    [statusKey]: statusResult,
    [msgkey]: message,
    [Key]: Value
});
export const userFeedback = (res, status, ...[statusKey, statusResult,msgkey,message, Key, Value]) => res.status(status).json({
    [statusKey]: statusResult,
    [msgkey]: message,
    [Key]: Value
});
