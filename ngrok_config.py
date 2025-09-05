#!/usr/bin/env python3
"""
🚀 Gerenciador Avançado do Ngrok para Almafluxo
"""

import requests
import json
import time
from typing import Dict, List, Optional
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NgrokManager:
    def __init__(self):
        self.tunnels: Dict[int, str] = {}
        self.base_url = "http://localhost:4040/api"
        self.session = requests.Session()
        self.session.timeout = 10
        
    def is_ngrok_running(self) -> bool:
        """Verifica se o Ngrok está rodando"""
        try:
            response = self.session.get(f"{self.base_url}/tunnels", timeout=5)
            return response.status_code == 200
        except requests.exceptions.RequestException as e:
            logger.warning(f"Ngrok não está respondendo: {e}")
            return False
    
    def create_tunnel(self, port: int, region: str = 'us', protocol: str = 'http') -> Optional[str]:
        """Cria um túnel seguro para uma porta específica"""
        try:
            tunnel_config = {
                "addr": port,
                "proto": protocol,
                "region": region,
                "name": f"almafluxo-{port}",
                "metadata": f"created_{int(time.time())}"
            }
            
            response = self.session.post(
                f"{self.base_url}/tunnels",
                headers={"Content-Type": "application/json"},
                data=json.dumps(tunnel_config)
            )
            
            if response.status_code in [201, 200]:
                tunnel_info = response.json()
                public_url = tunnel_info['public_url']
                self.tunnels[port] = public_url
                logger.info(f"Túnel criado para porta {port}: {public_url}")
                return public_url
            else:
                logger.error(f"Erro HTTP {response.status_code}: {response.text}")
                return None
                
        except requests.exceptions.Timeout:
            logger.error(f"Timeout ao criar túnel para porta {port}")
            return None
        except requests.exceptions.ConnectionError:
            logger.error("Erro de conexão com API do Ngrok")
            return None
        except Exception as e:
            logger.error(f"Erro inesperado ao criar túnel: {e}")
            return None
    
    def get_tunnels(self) -> List[dict]:
        """Obtém todos os túneis ativos com informações detalhadas"""
        try:
            response = self.session.get(f"{self.base_url}/tunnels", timeout=5)
            if response.status_code == 200:
                data = response.json()
                return data.get('tunnels', [])
            return []
        except requests.exceptions.RequestException as e:
            logger.warning(f"Erro ao obter túneis: {e}")
            return []
    
    def get_tunnel_url(self, port: int) -> Optional[str]:
        """Obtém a URL de um túnel específico"""
        return self.tunnels.get(port)
    
    def ensure_tunnel(self, port: int, max_retries: int = 3) -> Optional[str]:
        """Garante que um túnel existe, criando se necessário"""
        for attempt in range(max_retries):
            # Verificar túneis existentes primeiro
            tunnels = self.get_tunnels()
            for tunnel in tunnels:
                tunnel_addr = tunnel.get('config', {}).get('addr', '')
                if f":{port}" in tunnel_addr or tunnel_addr == str(port):
                    public_url = tunnel['public_url']
                    self.tunnels[port] = public_url
                    logger.info(f"Túnel existente encontrado para porta {port}")
                    return public_url
            
            # Criar novo túnel se não existir
            logger.info(f"Tentativa {attempt + 1} - Criando túnel para porta {port}")
            tunnel_url = self.create_tunnel(port)
            if tunnel_url:
                return tunnel_url
            
            time.sleep(2)  # Aguardar antes de tentar novamente
        
        logger.error(f"Falha ao criar túnel para porta {port} após {max_retries} tentativas")
        return None
    
    def delete_tunnel(self, tunnel_name: str) -> bool:
        """Deleta um túnel específico"""
        try:
            response = self.session.delete(f"{self.base_url}/tunnels/{tunnel_name}")
            return response.status_code == 204
        except requests.exceptions.RequestException as e:
            logger.error(f"Erro ao deletar túnel {tunnel_name}: {e}")
            return False
    
    def get_tunnel_metrics(self, tunnel_name: str) -> Optional[dict]:
        """Obtém métricas de um túnel específico"""
        try:
            response = self.session.get(f"{self.base_url}/tunnels/{tunnel_name}/metrics")
            if response.status_code == 200:
                return response.json()
            return None
        except requests.exceptions.RequestException:
            return None
    
    def get_ngrok_version(self) -> Optional[str]:
        """Obtém a versão do Ngrok"""
        try:
            response = self.session.get(f"{self.base_url}/version", timeout=5)
            if response.status_code == 200:
                return response.json().get('version')
            return None
        except requests.exceptions.RequestException:
            return None

# Exportar para uso em outros módulos
__all__ = ['NgrokManager']