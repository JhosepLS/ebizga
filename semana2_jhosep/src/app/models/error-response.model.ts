export default interface ErrorResponseModel {
    status: number;
    message: string;
    errorCode: string | null;
}