module hole_certificate::hole_certificate;

// === structs ===

public struct HoleCertificate has key, store {
   id: UID,
   // minter: address,
   // owner: address,
   meters: u64,
}

public struct CertificateRegistry has key {
   id: UID,
   certs: Table<address, address>
}

// === initialization ===

public struct HOLE_CERTIFICATE has drop {}

fun init(otw: HOLE_CERTIFICATE, ctx: &mut TxContext) {
   let registry = CertificateRegistry {
      id: object::new(ctx),
      certs: table::new(ctx),
   };
   transfer::share_object(registry);
}

// === getters ===

public fun id(c: &HoleCertificate): ID { c.id.to_inner() }
public fun meters(c: &HoleCertificate): u64 { c.meters }

public fun certs(r: &CertificateRegistry): &Table<address, address> { &r.certs }

// === view helpers ===

// === user functions ===

entry fun mint(
   hole: &Hole,
   registry: &mut CertificateRegistry,
   r: &Random,
   ctx: &mut TxContext,
) {
   let sender = ctx.sender();

   let user_digs = hole.user_digs(sender);
   assert!(user_digs > 0, EDidNotDig);

   let already_minted = registry.certs.contains(sender);
   assert!(!already_minted, EAlreadyMinted);

   let cert = HoleCertificate {
      id: object::new(ctx),
      meters: user_digs,
   };

   registry.certs.add(sender, cert.id.to_address());

   transfer::transfer(cert, ctx.sender());
}

// === errors ===

const EDidNotDig: u64 = 1000;
const EAlreadyMinted: u64 = 1001;

// === imports ===

use sui::{
    random::{Random},
    table::{Self, Table},
};
use dig::{
   dig::{Hole},
};
