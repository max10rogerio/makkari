const { Makkari } = require('../dist/makkari/makkari')

describe('Makkari Tests', () => {
  describe('POSTGRES', () => {
    it('should be send 10 queries with pg_sleep of 2 seconds each in less than 5 seconds', async () => {
      let makkari = null;

      const database = {
        type: 'postgres',
        config: {
          database: 'postgres',
          host: '0.0.0.0',
          port: 5432,
          user: 'postgres',
          password: 'postgres',
        },
      };

      makkari = new Makkari({ database });
      makkari.queries = Array(10).fill('select * from example, pg_sleep(2) limit 1');

      const hrStart = process.hrtime();
      await makkari.run();
      const hrEnd = process.hrtime(hrStart);

      expect(hrEnd[0]).toBeLessThan(5);
    });
  });

  describe('MYSQL', () => {
    it('should be send 10 queries with SLEEP of 2 seconds each in less than 5 seconds', async () => {
      let makkari = null;

      const database = {
        type: 'mysql',
        config: {
          database: 'makkari',
          host: '0.0.0.0',
          port: 3306,
          user: 'root',
          password: 'makkari',
        },
      };

      makkari = new Makkari({ database });
      makkari.queries = Array(10).fill('SELECT SLEEP(2)');

      const hrStart = process.hrtime();
      await makkari.run();
      const hrEnd = process.hrtime(hrStart);

      expect(hrEnd[0]).toBeLessThan(5);
    });
  });
});
