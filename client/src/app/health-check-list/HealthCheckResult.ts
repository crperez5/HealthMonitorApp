export class HealthCheckResult {
    url: string;
    status: string;
    component: string;
    version: string;
    details: ErrorDetail[];
    
    static ONLINE: string = 'ONLINE';
    static BROKEN: string = 'BROKEN';

    constructor(url, component, version, status, details) {
        this.url = url;
        this.component = component;
        this.version = version;
        this.status = status;
        this.details = details;
    }

    public IsOnline() : boolean {
        return this.status === HealthCheckResult.ONLINE
    }

    public static CreateDefault(): HealthCheckResult {
        return new HealthCheckResult('', '', '', HealthCheckResult.ONLINE, []);
    }
 }

 class ErrorDetail {
     name: string;
     message: string;
 }
