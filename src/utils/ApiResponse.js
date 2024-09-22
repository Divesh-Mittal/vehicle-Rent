class ApiResponse{
    constructor(statusCode,data,message="Success",isAuthentic=false){
        this.statusCode=statusCode
        this.message=message
        this.success=statusCode<400
        this.isAuthentic=isAuthentic;
    }
}
export {ApiResponse}