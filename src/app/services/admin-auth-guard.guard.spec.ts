import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth-guard.guard';

describe('AdminAuthGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuard]
    });
  });

  it('should ...', inject([AdminAuthGuard], (guard: AdminAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});