module hole_certificate::hole_certificate;

// === structs ===

public struct HoleCertificate has key, store {
   id: UID,
   // minter: address,
   // owner: address,
   meters: u64,
}

// === constructors ===

// === getters ===

public fun id(cert: &HoleCertificate): ID { cert.id.to_inner() }
public fun meters(cert: &HoleCertificate): u64 { cert.meters }

// === view helpers ===

// === user functions ===

entry fun mint(
   hole: &Hole,
   r: &Random,
   ctx: &mut TxContext,
) {
   // TODO check if already minted
   let sender = ctx.sender();
   let user_digs = hole.user_digs(sender);
   assert!(user_digs > 0, EUserDidNotDig);
   let certificate = HoleCertificate {
      id: object::new(ctx),
      meters: user_digs,
   };
   transfer::transfer(certificate, ctx.sender());
}

// === errors ===

const EUserDidNotDig: u64 = 1000;

// === imports ===

use sui::{
    random::{Random},
    table::{Self, Table},
};
use dig::{
   dig::{Hole},
};
