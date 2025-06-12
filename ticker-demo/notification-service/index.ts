import { Subject } from 'rxjs';

export const dealMatched$ = new Subject<string>();

export function sendDealMatchedNotification(dealId: string) {
  // Trigger PDF email (omitted)
  dealMatched$.next(dealId);
}
