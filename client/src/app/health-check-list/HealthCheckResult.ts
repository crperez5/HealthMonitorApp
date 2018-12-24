export class HealthCheckResult {
    url: string;
    status: string;
    component: string;
    version: string;
    details: ErrorDetail[];

    constructor(url, component, version, status, details) {
        this.url = url;
        this.component = component;
        this.version = version;
        this.status = status;
        this.details = details;
    }

    public static CreateDefault(): HealthCheckResult {
        return new HealthCheckResult('', '', '', '', []);
    }
 }

 class ErrorDetail {
     name: string;
     message: string;
 }
