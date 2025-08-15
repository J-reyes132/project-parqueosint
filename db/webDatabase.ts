import { Platform } from 'react-native';
import { DBResult, DBRow } from './database';

export class WebDatabase {
  private static instance: WebDatabase;
  private isInitialized: boolean = false;
  private data: { [tableName: string]: any[] } = {};

  private constructor() {}

  public static getInstance(): WebDatabase {
    if (!WebDatabase.instance) {
      WebDatabase.instance = new WebDatabase();
    }
    return WebDatabase.instance;
  }

  public isDbInitialized(): boolean {
    return this.isInitialized;
  }

  public async init(): Promise<void> {
    if (Platform.OS !== 'web') {
      throw new Error('WebDatabase solo debe usarse en la plataforma web');
    }

    try {
      // Cargar datos existentes del localStorage
      this.loadFromLocalStorage();
      
      // Si no hay datos, inicializar con datos de prueba
      if (!this.hasData()) {
        await this.seedData();
      }
      
      this.isInitialized = true;
      console.log('WebDatabase inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar WebDatabase:', error);
      throw error;
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem('smartparking_data');
      if (stored) {
        this.data = JSON.parse(stored);
        console.log('Datos cargados desde localStorage');
      } else {
        this.data = {
          users: [],
          parkings: [],
          reservations: [],
          payment_methods: [],
          vehicles: []
        };
      }
    } catch (error) {
      console.error('Error cargando desde localStorage:', error);
      this.data = {
        users: [],
        parkings: [],
        reservations: [],
        payment_methods: [],
        vehicles: []
      };
    }
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('smartparking_data', JSON.stringify(this.data));
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  }

  private hasData(): boolean {
    return this.data.users && this.data.users.length > 0;
  }

  private async seedData(): Promise<void> {
    console.log('Sembrando datos iniciales en WebDatabase...');

    // Usuario de prueba
    this.data.users = [{
      id: 1,
      name: 'Juan Carlos Pérez',
      email: 'juan.perez@email.com',
      phone: '+502 1234-5678',
      password_hash: 'hashed_password_123',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }];

    // Parqueos de prueba
    this.data.parkings = [
      {
        id: 1,
        name: 'Centro Comercial Plaza',
        address: 'Av. Principal 123, Centro',
        latitude: 14.6349,
        longitude: -90.5069,
        price_per_hour: 2500,
        total_spots: 100,
        available_spots: 15,
        features: JSON.stringify(['Cámaras', 'Sensores', 'QR']),
        status: 'available',
        description: 'Parqueo seguro en el corazón del centro comercial con acceso directo a todas las tiendas.',
        operating_hours: '06:00 - 23:00',
        security: 'Vigilancia 24/7 con cámaras de seguridad',
        payment_methods: JSON.stringify(['Tarjeta de crédito', 'Wallet digital', 'Efectivo']),
        contact_phone: '+502 2234-5678',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Parqueo Municipal Norte',
        address: 'Calle 5ta Norte, Zona 1',
        latitude: 14.6400,
        longitude: -90.5100,
        price_per_hour: 1800,
        total_spots: 50,
        available_spots: 3,
        features: JSON.stringify(['Sensores', 'QR']),
        status: 'limited',
        description: 'Parqueo municipal con tarifas accesibles y tecnología de sensores para facilitar encontrar espacios.',
        operating_hours: '05:00 - 22:00',
        security: 'Patrullaje regular y sensores de movimiento',
        payment_methods: JSON.stringify(['Tarjeta de crédito', 'Wallet digital']),
        contact_phone: '+502 2234-5679',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Torre Empresarial',
        address: 'Blvd. Los Próceres 445',
        latitude: 14.6280,
        longitude: -90.5150,
        price_per_hour: 3200,
        total_spots: 200,
        available_spots: 0,
        features: JSON.stringify(['Cámaras', 'Sensores', 'QR', 'Valet']),
        status: 'full',
        description: 'Parqueo premium con servicio de valet parking y máxima seguridad para el distrito financiero.',
        operating_hours: '24 horas',
        security: 'Seguridad profesional 24/7 y sistema de cámaras HD',
        payment_methods: JSON.stringify(['Tarjeta de crédito', 'Wallet digital', 'Transferencias']),
        contact_phone: '+502 2234-5680',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 4,
        name: 'Estadio Nacional',
        address: 'Av. del Deporte s/n',
        latitude: 14.6180,
        longitude: -90.4980,
        price_per_hour: 1500,
        total_spots: 300,
        available_spots: 45,
        features: JSON.stringify(['Sensores']),
        status: 'available',
        description: 'Amplio parqueo del estadio nacional con capacidad para eventos masivos y tarifas económicas.',
        operating_hours: '06:00 - 24:00',
        security: 'Personal de seguridad en horarios de eventos',
        payment_methods: JSON.stringify(['Tarjeta de crédito', 'Efectivo']),
        contact_phone: '+502 2234-5681',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // Reservas de prueba
    this.data.reservations = [
      {
        id: 1,
        user_id: 1,
        parking_id: 1,
        start_time: '2024-01-15 14:30:00',
        end_time: '2024-01-15 17:45:00',
        duration_minutes: 195,
        amount: 8125,
        status: 'completed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 2,
        user_id: 1,
        parking_id: 3,
        start_time: '2024-01-12 09:00:00',
        end_time: '2024-01-12 18:00:00',
        duration_minutes: 540,
        amount: 28800,
        status: 'completed',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // Métodos de pago de prueba
    this.data.payment_methods = [{
      id: 1,
      user_id: 1,
      type: 'card',
      last_four: '4532',
      is_default: 1,
      created_at: new Date().toISOString()
    }];

    // Vehículos de prueba
    this.data.vehicles = [{
      id: 1,
      user_id: 1,
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      license_plate: 'P123456',
      color: 'Blanco',
      is_default: 1,
      created_at: new Date().toISOString()
    }];

    this.saveToLocalStorage();
    console.log('Datos iniciales sembrados correctamente');
  }

  public async executeQuery(query: string, params?: any[]): Promise<DBResult> {
    if (!this.isInitialized) {
      throw new Error('WebDatabase no inicializada');
    }

    console.log('Ejecutando query:', query, params);

    // Parsear query básica para INSERT/UPDATE/DELETE
    const queryType = query.trim().toUpperCase().split(' ')[0];
    
    switch (queryType) {
      case 'INSERT':
        return this.handleInsert(query, params || []);
      case 'UPDATE':
        return this.handleUpdate(query, params || []);
      case 'DELETE':
        return this.handleDelete(query, params || []);
      default:
        throw new Error(`Query type ${queryType} no soportado en WebDatabase`);
    }
  }

  public async getAll(query: string, params?: any[]): Promise<DBRow[]> {
    if (!this.isInitialized) {
      throw new Error('WebDatabase no inicializada');
    }

    console.log('Ejecutando getAll:', query, params);

    // Parsear SELECT básico
    const tableName = this.extractTableName(query);
    if (!tableName || !this.data[tableName]) {
      return [];
    }

    let results = [...this.data[tableName]];

    // Aplicar filtros básicos de WHERE
    if (params && params.length > 0 && query.includes('WHERE')) {
      results = this.applyWhereFilters(results, query, params);
    }

    // Aplicar ORDER BY básico
    if (query.includes('ORDER BY')) {
      results = this.applyOrderBy(results, query);
    }

    return results;
  }

  public async getFirst(query: string, params?: any[]): Promise<DBRow | null> {
    const results = await this.getAll(query, params);
    return results.length > 0 ? results[0] : null;
  }

  private handleInsert(query: string, params: any[]): DBResult {
    const tableName = this.extractTableName(query);
    if (!tableName || !this.data[tableName]) {
      throw new Error(`Tabla ${tableName} no encontrada`);
    }

    const newId = this.getNextId(tableName);
    const columns = this.extractInsertColumns(query);
    const newRecord: any = { id: newId };

    columns.forEach((column, index) => {
      newRecord[column] = params[index];
    });

    this.data[tableName].push(newRecord);
    this.saveToLocalStorage();

    return {
      insertId: newId,
      rowsAffected: 1
    };
  }

  private handleUpdate(query: string, params: any[]): DBResult {
    const tableName = this.extractTableName(query);
    if (!tableName || !this.data[tableName]) {
      throw new Error(`Tabla ${tableName} no encontrada`);
    }

    // Implementación básica de UPDATE WHERE id = ?
    const recordId = params[params.length - 1]; // Asumimos que el ID está al final
    const recordIndex = this.data[tableName].findIndex((r: any) => r.id === recordId);

    if (recordIndex === -1) {
      return { rowsAffected: 0 };
    }

    // Para simplificar, solo actualizamos available_spots y status
    if (query.includes('available_spots') && params.length >= 3) {
      this.data[tableName][recordIndex].available_spots = params[0];
      this.data[tableName][recordIndex].status = params[1];
      this.data[tableName][recordIndex].updated_at = new Date().toISOString();
    }

    this.saveToLocalStorage();
    return { rowsAffected: 1 };
  }

  private handleDelete(query: string, params: any[]): DBResult {
    // Implementación básica si se necesita
    return { rowsAffected: 0 };
  }

  private extractTableName(query: string): string {
    const match = query.match(/(?:FROM|INTO|UPDATE)\s+(\w+)/i);
    return match ? match[1] : '';
  }

  private extractInsertColumns(query: string): string[] {
    const match = query.match(/\(([^)]+)\)/);
    if (!match) return [];
    
    return match[1].split(',').map(col => col.trim());
  }

  private getNextId(tableName: string): number {
    const table = this.data[tableName];
    if (!table || table.length === 0) return 1;
    
    const maxId = Math.max(...table.map((r: any) => r.id || 0));
    return maxId + 1;
  }

  private applyWhereFilters(results: any[], query: string, params: any[]): any[] {
    // Implementación básica para email = ?
    if (query.includes('email = ?') && params.length > 0) {
      return results.filter(r => r.email === params[0]);
    }
    
    // WHERE id = ?
    if (query.includes('WHERE id = ?') && params.length > 0) {
      return results.filter(r => r.id === params[0]);
    }

    // WHERE status = ?
    if (query.includes('status = ?') && params.length > 0) {
      return results.filter(r => r.status === params[0]);
    }

    // WHERE user_id = ?
    if (query.includes('user_id = ?') && params.length > 0) {
      return results.filter(r => r.user_id === params[0]);
    }

    return results;
  }

  private applyOrderBy(results: any[], query: string): any[] {
    if (query.includes('ORDER BY available_spots DESC')) {
      return results.sort((a, b) => (b.available_spots || 0) - (a.available_spots || 0));
    }
    
    return results;
  }

  public async close(): Promise<void> {
    this.saveToLocalStorage();
    this.isInitialized = false;
  }

  public async resetDatabase(): Promise<void> {
    localStorage.removeItem('smartparking_data');
    this.data = {
      users: [],
      parkings: [],
      reservations: [],
      payment_methods: [],
      vehicles: []
    };
    await this.seedData();
    console.log('WebDatabase reseteada correctamente');
  }
}
