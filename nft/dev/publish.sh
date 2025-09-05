#!/usr/bin/env bash

set -o nounset      # Treat unset variables as an error when substituting
set -o errexit      # Exit immediately if any command returns a non-zero status
set -o pipefail     # Prevent errors in a pipeline from being masked
# set -o xtrace       # Print each command to the terminal before execution

SCRIPT_DIR="$( dirname "$(readlink -f "${BASH_SOURCE[0]}")" )"

### paths ###

NFT_PACKAGE_DIR="$SCRIPT_DIR/.."

### variables ###

network=$(sui client active-env)
digPkgId=""
holeObjId=""
nftPkgId=""
registryId=""

### functions ###

function publish_package() {
    local dir="$1"
    echo "" >&2
    echo "================================================" >&2
    echo "Publishing $dir" >&2
    echo "" >&2
    cd "$dir"
    sui client publish --with-unpublished-dependencies --json
}

function get_package_id() {
    local json="$1"

    echo "$json" | jq -r '.objectChanges[] | select(.type == "published") | .packageId'
}

function get_object_id() {
    local json="$1"
    local object_type="$2"

    echo "$json" | jq -r ".objectChanges[] | select(.objectType == \"$object_type\") | .objectId"
}

### check active network ###

if [ "$network" == "devnet" ]; then
    read -p "You are about to publish to devnet. Are you sure? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        echo "Aborted by user."
        exit 1
    fi
elif [ "$network" != "localnet" ]; then
    echo "Error: The active environment is not localnet or devnet. Aborting."
    exit 1
fi

### publish the package ###

json=$(publish_package "$NFT_PACKAGE_DIR")
digPkgId=$(get_package_id "$json")
nftPkgId="$digPkgId"
registryId=$(get_object_id "$json" "$nftPkgId::hole_certificate::CertificateRegistry")

### create the hole ===

distance=12651190
sui client ptb \
 --json \
 --move-call $digPkgId::dig::new $distance \
 --assign holeId \
 --move-call "0x2::transfer::public_share_object<$digPkgId::dig::Hole>" holeId

echo "digPkgId: $digPkgId"
echo "nftPkgId: $nftPkgId"
echo "registryId: $registryId"
