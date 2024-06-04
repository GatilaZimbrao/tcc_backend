#!/bin/bash

# Carregar NVM
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"


# Executar o script bash
bash ./setup-and-start.sh
