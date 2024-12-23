import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartStatuses } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  findByUserId(userId: string): Cart {
    return this.userCarts[ userId ];
  }

  createByUserId(userId: string) {
    const id = v4();
    const userCart = {
      id,
      user_id: `user_mock_id${Math.random()}`,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      status: CartStatuses.OPEN,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    this.userCarts[ userId ] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
