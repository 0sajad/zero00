
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal } from 'lucide-react';

interface CMDProps {
  isDeveloper?: boolean;
}

const CMD = ({ isDeveloper = false }: CMDProps) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<string[]>([
    'OCTA NETWORK CMD Terminal v3.0',
    'Type "help" for available commands',
    '=========================='
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const executeCommand = (cmd: string) => {
    const newHistory = [...history, `> ${cmd}`];
    
    switch (cmd.toLowerCase().trim()) {
      case 'help':
        newHistory.push('Available commands:');
        newHistory.push('- help: Show available commands');
        newHistory.push('- clear: Clear terminal');
        newHistory.push('- status: Show system status');
        newHistory.push('- scan: Network scan');
        newHistory.push('- speed: Speed test');
        if (isDeveloper) {
          newHistory.push('- devtools: Developer tools');
          newHistory.push('- licenses: License management');
          newHistory.push('- config: System configuration');
        }
        break;
      case 'clear':
        setHistory(['OCTA NETWORK CMD Terminal v3.0', 'Terminal cleared']);
        setCommand('');
        return;
      case 'status':
        newHistory.push('System Status: ONLINE');
        newHistory.push('Network: Connected');
        newHistory.push('Security: ACTIVE');
        newHistory.push('Performance: OPTIMAL');
        break;
      case 'scan':
        newHistory.push('Starting network scan...');
        newHistory.push('Found 24 devices on network');
        newHistory.push('Scan completed successfully');
        break;
      case 'speed':
        newHistory.push('Running speed test...');
        newHistory.push('Download: 250 Mbps');
        newHistory.push('Upload: 50 Mbps');
        newHistory.push('Ping: 8ms');
        break;
      case 'devtools':
        if (isDeveloper) {
          newHistory.push('Developer Tools Access Granted');
          newHistory.push('- All system controls unlocked');
          newHistory.push('- License management enabled');
          newHistory.push('- Advanced settings available');
        } else {
          newHistory.push('Access Denied: Developer privileges required');
        }
        break;
      case 'licenses':
        if (isDeveloper) {
          newHistory.push('License Management System');
          newHistory.push('Active licenses: 5');
          newHistory.push('Expired licenses: 2');
          newHistory.push('Use "license create" to generate new license');
        } else {
          newHistory.push('Access Denied: Developer privileges required');
        }
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
        newHistory.push('Type "help" for available commands');
    }
    
    setHistory(newHistory);
    setCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(command);
    }
  };

  return (
    <Card className="h-96 bg-black text-green-400 font-mono">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-400 flex items-center text-sm">
          <Terminal className="h-4 w-4 mr-2" />
          OCTA CMD Terminal {isDeveloper && '(Developer Mode)'}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80 overflow-y-auto">
        <div className="space-y-1 text-xs">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">{line}</div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-green-400 mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent border-none outline-none text-green-400 flex-1"
            placeholder="Enter command..."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CMD;
