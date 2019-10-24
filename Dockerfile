FROM tomcat:8.0.20-jre8
COPY build/libs/strongman-tracker.jar /usr/local/tomcat/webapps/ROOT.jar
CMD ["java", "-jar", "/usr/local/tomcat/webapps/ROOT.jar"]