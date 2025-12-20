import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const STORAGE_USER = 'auth_user';
const STORAGE_SESSION = 'auth_session';

export interface StoredUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageReady: Promise<Storage>;
  private email = '';

  constructor(private storage: Storage) {
    this.storageReady = this.storage.create();
  }

  private async ensureReady(): Promise<Storage> {
    return this.storageReady;
  }

  private async getStoredUser(): Promise<StoredUser | null> {
    await this.ensureReady();
    const user = await this.storage.get(STORAGE_USER);
    return user ?? null;
  }

  async register(
    email: string | { email: string; password: string },
    password?: string
  ): Promise<boolean> {
    await this.ensureReady();

    let user: StoredUser;

    if (typeof email === 'string') {
      if (!password) {
        throw new Error('Password requerido');
      }
      user = { email, password };
    } else {
      user = { email: email.email, password: email.password };
    }

    await this.storage.set(STORAGE_USER, user);
    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    await this.ensureReady();
    const stored = await this.getStoredUser();

    const ok =
      !!stored &&
      stored.email === email.trim() &&
      stored.password === password.trim();

    if (ok) {
      this.email = stored.email;
      await this.storage.set(STORAGE_SESSION, {
        email: stored.email,
        loggedIn: true,
      });
    }

    return ok;
  }

  async isLoggedInAsync(): Promise<boolean> {
    await this.ensureReady();
    const session = await this.storage.get(STORAGE_SESSION);
    return !!(session && session.loggedIn);
  }

  get currentEmail(): string {
    return this.email;
  }

  getEmail(): string | null {
    return this.email || null;
  }

  async logout(): Promise<void> {
    await this.ensureReady();
    this.email = '';
    await this.storage.remove(STORAGE_SESSION);
  }
}
