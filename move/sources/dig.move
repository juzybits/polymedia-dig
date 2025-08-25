module dig::dig;

// === structs ===

public struct Hole has key, store {
   id: UID,
   distance: u64,
   progress: u64,
   users: Table<address, u64>,
}

// === constructors & transfers ===

public fun new(
   distance: u64,
   ctx: &mut TxContext,
): Hole {
   assert!(distance > 0, EInvalidDistance);
   Hole {
      id: object::new(ctx),
      distance,
      progress: 0,
      users: table::new(ctx),
   }
}

// === getters ===

public fun id(hole: &Hole): ID { hole.id.to_inner() }
public fun distance(hole: &Hole): u64 { hole.distance }
public fun progress(hole: &Hole): u64 { hole.progress }
public fun users(hole: &Hole): &Table<address, u64> { &hole.users }

// === view helpers ===

public fun user_digs(hole: &Hole, user: address): u64 {
   if (!hole.users.contains(user)) {
      0
   } else {
      *hole.users.borrow(user)
   }
}

// === user functions ===

entry fun dig(
   hole: &mut Hole,
   _random: &Random,
   ctx: &TxContext,
) {
   assert!(hole.progress < hole.distance, EAlreadyCompleted);
   let sender = ctx.sender();
   hole.progress = hole.progress + 1;
   if (!hole.users.contains(sender)) {
      hole.users.add(sender, 1);
   } else {
      let user_digs = hole.users.borrow_mut(sender);
      *user_digs = *user_digs + 1;
   }
}

// === errors ===

const EInvalidDistance: u64 = 0;
const EAlreadyCompleted: u64 = 1;

// === imports ===

use sui::{
    random::{Random},
    table::{Self, Table},
};
