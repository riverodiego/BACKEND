import knex from "knex";

class ContainerSQL{
    constructor(options, tableName) {
        (this.knex = knex(JSON.parse(options))),(this.tableName = tableName);
    }

    async getById(id) {
        try {
            const byId = await this.knex
            .from(this.tableName)
            .select("*")
            .where("id", id);
            return byId;
        } catch (error) {
            console.error(error);
        }
    }
    
    async getAll() {
        try {
            const getAll = await this.knex.from(this.tableName).select("*");
            return getAll;
        } catch (error) {
            console.error(error);
        }
    }
    
    async save(obj) {
        try {
          const save = await this.knex(this.tableName).insert(obj);
          return save;
        } catch (error) {
          console.error(error);
        }
      }
    
      async updated(id, param) {
        try {
          const update = await this.knex
            .from(this.tableName)
            .where("id", id)
            .update(param);
          return update;
        } catch (error) {
          console.error();
        }
      }
    
      async deleteById(id) {
        try {
          const byId = await this.knex.from(this.tableName).where("id", id).del();
          return byId;
        } catch (error) {
          console.error(error);
        }
      }
    
      async deleteAll() {
        try {
          const del = await this.knex.from(this.tableName).del();
          return del;
        } catch (error) {
          console.error(error);
        }
      }
    }

export default ContainerSQL;