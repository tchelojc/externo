#!/usr/bin/env python3
"""
🚀 NGROK LEVE - Versão simplificada e rápida
"""

import requests
import time
import subprocess
from pathlib import Path

class LightNgrok:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.ports = [8501, 8502, 8503, 8504]
        
    def start_ngrok(self):
        """Inicia o ngrok de forma simples"""
        print("=" * 50)
        print("🚀 INICIANDO NGROK LEVE")
        print("=" * 50)
        
        try:
            # Verificar se ngrok já está rodando
            try:
                requests.get("http://localhost:4040/api/tunnels", timeout=2)
                print("✅ Ngrok já está em execução")
                return True
            except:
                pass
            
            # Iniciar ngrok em background
            print("🔄 Iniciando ngrok...")
            subprocess.Popen(
                ["ngrok", "start", "--none"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            time.sleep(3)
            return True
            
        except Exception as e:
            print(f"❌ Erro ao iniciar ngrok: {e}")
            return False
    
    def create_tunnels(self):
        """Cria túneis apenas para as portas necessárias"""
        print("\n🌐 Criando túneis...")
        
        for port in self.ports:
            try:
                # Configuração do túnel
                tunnel_config = {
                    "addr": port,
                    "proto": "http",
                    "name": f"alma-{port}"
                }
                
                # Criar túnel
                response = requests.post(
                    "http://localhost:4040/api/tunnels",
                    json=tunnel_config,
                    timeout=5
                )
                
                if response.status_code in [200, 201]:
                    url = response.json()['public_url']
                    print(f"   ✅ Porta {port}: {url}")
                else:
                    print(f"   ⚠️ Porta {port}: Não criada")
                    
            except Exception as e:
                print(f"   ❌ Porta {port}: Erro - {str(e)[:50]}...")
            
            time.sleep(1)
    
    def get_active_tunnels(self):
        """Lista túneis ativos"""
        print("\n📊 Túneis ativos:")
        try:
            response = requests.get("http://localhost:4040/api/tunnels", timeout=5)
            tunnels = response.json().get('tunnels', [])
            
            for tunnel in tunnels:
                port = tunnel['config']['addr'].split(':')[-1]
                print(f"   🔗 {tunnel['public_url']} → porta {port}")
                
        except Exception as e:
            print(f"   ❌ Erro ao buscar túneis: {e}")

def main():
    ngrok = LightNgrok()
    
    # Iniciar ngrok
    if not ngrok.start_ngrok():
        return
    
    # Criar túneis
    ngrok.create_tunnels()
    
    # Mostrar túneis ativos
    ngrok.get_active_tunnels()
    
    print("\n🎯 Ngrok configurado com sucesso!")
    print("📍 Acesse: http://localhost:4040 para ver a interface")
    print("🛑 Use Ctrl+C para parar (o ngrok continuará rodando)")

if __name__ == "__main__":
    main()