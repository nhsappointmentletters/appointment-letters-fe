import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class OperationErrorNotifier {
    constructor(private snackBar: MatSnackBar) { }

    notifyUser(message: string) {
        this.snackBar.open(`${message}. Please contact support if this problem persists.`, 
            'OK', { panelClass: 'operation-error' });
    }
}
