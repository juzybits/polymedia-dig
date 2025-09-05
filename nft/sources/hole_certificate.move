module hole_certificate::hole_certificate;

// === imports ===

use std::{
    string::{String},
};
use sui::{
    random::{Random, RandomGenerator},
    table::{Self, Table},
};
use dig::{
   dig::{Hole},
};

// === errors ===

const EDidNotDig: u64 = 1000;
const EAlreadyMinted: u64 = 1001;

// === constants ===

const TITLES: vector<vector<u8>> = vector[
   b"Chief Dirt Officer",
   b"Digging Virtuoso",
   b"Earth Annoyance Specialist",
   b"Hole Lover",
   b"Master of Mud",
   b"PhD in Pointless Excavation",
   b"Professional Hole Contributor",
   b"Subterranean Scholar",
   b"Sultan of Soil",
   b"Tunnel Visionary",
];

const REMARKS: vector<vector<u8>> = vector[
   b"The hole acknowledges your futile gesture",
   b"The hole appreciates your contribution",
   b"The hole notes your commitment to the void",
   b"The hole notes your shovel discipline",
   b"The hole questions your life choices",
   b"The hole rates your disturbance as satisfactory",
   b"The hole regards your labor as correct",
   b"The hole respects your commitment to poor decisions",
   b"The hole respects your dedication to pointless tasks",
   b"The hole wonders if you have other hobbies",
];

// === structs ===

public struct HoleCertificate has key, store {
   id: UID,

   digger: address,
   meters: u64,

   title: String,
   remark: String,

   crisis: u8,
   doubts: u8,
   moles: u8,
   productivity: u8,
   regret: u8,
   shovels: u8,
   therapy: u8,
}

public struct CertificateRegistry has key {
   id: UID,
   certs: Table<address, address>
}

// === initialization ===

public struct HOLE_CERTIFICATE has drop {}

fun init(_otw: HOLE_CERTIFICATE, ctx: &mut TxContext) {
   let registry = CertificateRegistry {
      id: object::new(ctx),
      certs: table::new(ctx),
   };
   transfer::share_object(registry);
}

// === getters ===

public fun id(c: &HoleCertificate): ID { c.id.to_inner() }

public fun digger(c: &HoleCertificate): address { c.digger }
public fun meters(c: &HoleCertificate): u64 { c.meters }

public fun title(c: &HoleCertificate): &String { &c.title }
public fun remark(c: &HoleCertificate): &String { &c.remark }

public fun crisis(c: &HoleCertificate): u8 { c.crisis }
public fun doubts(c: &HoleCertificate): u8 { c.doubts }
public fun moles(c: &HoleCertificate): u8 { c.moles }
public fun productivity(c: &HoleCertificate): u8 { c.productivity }
public fun regret(c: &HoleCertificate): u8 { c.regret }
public fun shovels(c: &HoleCertificate): u8 { c.shovels }
public fun therapy(c: &HoleCertificate): u8 { c.therapy }

public fun certs(r: &CertificateRegistry): &Table<address, address> { &r.certs }

// === view helpers ===

// === user functions ===

entry fun mint(
   hole: &Hole, // TODO check ID
   registry: &mut CertificateRegistry,
   r: &Random,
   ctx: &mut TxContext,
) {
   let digger = ctx.sender();

   let meters = hole.user_digs(digger);
   assert!(meters > 0, EDidNotDig);

   let already_minted = registry.certs.contains(digger);
   assert!(!already_minted, EAlreadyMinted);

   let mut rg = r.new_generator(ctx);

   let cert = HoleCertificate {
      id: object::new(ctx),

      digger,
      meters,

      title: random_string(TITLES, &mut rg),
      remark: random_string(REMARKS, &mut rg),

      crisis: random_number(&mut rg),
      doubts: random_number(&mut rg),
      moles: random_number(&mut rg),
      productivity: random_number(&mut rg),
      regret: random_number(&mut rg),
      shovels: random_number(&mut rg),
      therapy: random_number(&mut rg),
   };

   registry.certs.add(digger, cert.id.to_address());

   transfer::transfer(cert, digger);
}

// === private functions ===

fun random_string(
   values: vector<vector<u8>>,
   rg: &mut RandomGenerator,
): String {
   let len = values.length();
   let idx = rg.generate_u64_in_range(0, len - 1);
   values[idx].to_string()
}

fun random_number(
   rg: &mut RandomGenerator,
): u8 {
   rg.generate_u8_in_range(0, 100)
}
