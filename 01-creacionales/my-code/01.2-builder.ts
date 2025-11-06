import { COLORS } from '../../helpers/colors.ts';

/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */


//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

    console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

class QueryBuilder {

    private table: string;
    private fields: string[] = [];
    private conditions: string[] = [];
    private field: string = '';
    private order: string = '';
    private count: number = 0;

    constructor(table: string) {
        this.table = table;
    }

    select(...fields: string[]): QueryBuilder {
        this.fields = fields;
        return this;
    }

    where(condition: string): QueryBuilder {
        this.conditions.push(condition);
        return this;
    }

    orderBy(field: string, order: string): QueryBuilder {
        this.field = field;
        this.order = order;
        return this;
    }

    limit(count: number): QueryBuilder{
        this.count =  count;
        return this;
    }

    execute(): string{

        const selectSentence = 
            this.fields.length > 0 ? 
            `SELECT ${this.fields?.join(', ')} FROM`: 
            'SELECT * FROM';

        const whereSentence = 
            this.conditions.length > 0 ? 
            `WHERE ${this.conditions.join(' AND ')}`:
            '';

        const orderSentence = `ORDER BY ${this.field} ${this.order}`

        const limitSentence = `LIMIT ${this.count}`

        return `${selectSentence} ${this.table} ${whereSentence} ${orderSentence} ${limitSentence}`;
    }
}

function main () {
    
    const userQuery = new QueryBuilder('users')
        .select('id','email','name')
        .where('age > 18')
        .orderBy('name','ASC')
        .limit(10)
        .execute();

    console.log('%c\nConsulta Usuario:\n',COLORS.red);
    console.log(userQuery);
    
    const bankQuery = new QueryBuilder('bank')
        .select()
        .where('name = samuel')
        .where('lastname = calderon')
        .orderBy('name','ASC')
        .limit(1)
        .execute();

    console.log('%c\nConsulta Banco:\n',COLORS.red);
    console.log(bankQuery);
}

main();