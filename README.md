# dscatalog-bootcamp-devsuperior

<h1>Arquivos de Configuração Banco H2</h1>

<h1>application.properties</h1>

spring.profiles.active=test

spring.jpa.open-in-view=false

<h3>application-test.properties</h3>

spring.datasource.url=jdbc:h2:mem:testdb <br/>
spring.datasource.username=sa
spring.datasource.password=

spring.h2.console.enabled=true
spring.h2.console.path=/h2-console


<h1>Parametros de Configuração para paginação Spring</h1>

@RequestParam(value = "page", defaultValue = "0") Integer page,<br/>
@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,<br/>
@RequestParam(value = "orderBy", defaultValue = "name") String orderBy,<br/>
@RequestParam(value = "direction", defaultValue = "DESC") String direction)
