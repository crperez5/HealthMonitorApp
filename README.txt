HealthMonitorApp


------------------------
This repo includes:
-----------------------

- A server app written in Express which simply returns mocked service status data.
- A client app written in Angular which calls the server to fetch that data and prints it onto the screen.
The UI is very simple, it only consists of a table listing the list of services along with their properties 
and a timeline showing the evolution of the service's status.

YAML files have been provided to configure GitLab's CI/CD pipeline and futher deployment to Google Cloud Platform.
(last version has been deployed to https://health-monitor-226518.appspot.com/).

The most interesting implementation detail about the app, is the usage of RxJS to return a stream of
HealthCheckResults that can be consumed from the UI components (health-check-list-endpoint-service.service).


