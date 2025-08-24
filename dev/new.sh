#!/usr/bin/env bash

set -o nounset      # Treat unset variables as an error when substituting
set -o errexit      # Exit immediately if any command returns a non-zero status
set -o pipefail     # Prevent errors in a pipeline from being masked
# set -o xtrace       # Print each command to the terminal before execution

# display usage information
usage() {
    echo "Usage: $0 <packageId>"
    echo "  packageId: The package ID to process"
    exit 1
}

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    echo "Error: packageId argument is required"
    usage
fi

pkgId="$1"
distance=12651190

sui client ptb \
 --move-call $pkgId::dig::new $distance \
 --assign holeId \
 --move-call "0x2::transfer::public_share_object<$pkgId::dig::Hole>" holeId
