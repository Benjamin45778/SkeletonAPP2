import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_USER = 'auth_user';
const STORAGE_SESSION = 'auth_session';

export interface StoredUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private email = '';
  private storageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.storageReady = this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    const session = await this.storage.get(STORAGE_SESSION);
    if (session?.email && session.loggedIn) {
      this.email = session.email;
    }
  }

  getEmail(): string {
    return this.email;
  }

  async isLoggedInAsync(): Promise<boolean> {
    await this.storageReady;
    const session = await this.storage.get(STORAGE_SESSION);
    return !!session?.loggedIn;
  }

  async register(data: { email: string; password: string }): Promise<boolean> {
    await this.storageReady;

    const existing: StoredUser | null = await this.storage.get(STORAGE_USER);
    if (existing && existing.email === data.email) {
      // ya existe
      return false;
    }

    await this.storage.set(STORAGE_USER, {
      email: data.email,
      password: data.password,
    } as StoredUser);

    // Dejar logeado después del registro
    this.email = data.email;
    await this.storage.set(STORAGE_SESSION, {
      email: data.email,
      loggedIn: true,
    });

    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    await this.storageReady;

    const user: StoredUser | null = await this.storage.get(STORAGE_USER);
    if (!user) return false;

    const ok = user.email === email && user.password === password;

    if (ok) {
      this.email = email;
      await this.storage.set(STORAGE_SESSION, {
        email,
        loggedIn: true,
      });
    }

    return ok;
  }

  async logout(): Promise<void> {
    await this.storageReady;
    this.email = '';
    await this.storage.remove(STORAGE_SESSION);
  }
}
