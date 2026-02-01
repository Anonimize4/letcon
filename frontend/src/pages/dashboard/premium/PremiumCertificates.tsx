import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown, Award, Medal, Star, Zap, Target,
  Shield, Network, BookOpen, Trophy, Home,
  FileCheck, Download, Calendar, Clock
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-yellow-500/20 text-yellow-400'
        : 'text-htb-foreground hover:bg-htb-selection-background/50 hover:text-htb-bright-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const PremiumCertificates: React.FC = () => {
  const navigate = useNavigate();

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: 'Web Application Security Expert',
      issuer: 'LETHCON Academy',
      issueDate: '2024-02-15',
      expiryDate: '2026-02-15',
      description: 'Advanced certification for web application security testing and vulnerability assessment',
      skills: ['OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF', 'Authentication Bypass'],
      status: 'active',
      credentialId: 'LWASE-2024-001234'
    },
    {
      id: 2,
      title: 'Network Security Professional',
      issuer: 'LETHCON Academy',
      issueDate: '2024-01-20',
      expiryDate: '2026-01-20',
      description: 'Comprehensive certification covering network security and defense strategies',
      skills: ['Network Scanning', 'Firewalls', 'IDS/IPS', 'VPN', 'Network Forensics'],
      status: 'active',
      credentialId: 'LNSP-2024-001567'
    },
    {
      id: 3,
      title: 'Penetration Testing Specialist',
      issuer: 'LETHCON Academy',
      issueDate: '2024-03-01',
      expiryDate: '2026-03-01',
      description: 'Specialized certification for penetration testing methodologies and techniques',
      skills: ['Metasploit', 'Burp Suite', 'Nmap', 'Reverse Engineering', 'Privilege Escalation'],
      status: 'active',
      credentialId: 'LPTS-2024-001890'
    },
    {
      id: 4,
      title: 'Incident Response Handler',
      issuer: 'LETHCON Academy',
      issueDate: '2024-02-01',
      expiryDate: '2026-02-01',
      description: 'Certification for digital forensics and incident response procedures',
      skills: ['Malware Analysis', 'Memory Forensics', 'Log Analysis', 'Threat Hunting', 'SIEM'],
      status: 'active',
      credentialId: 'LIRH-2024-001234'
    },
    {
      id: 5,
      title: 'Cloud Security Architect',
      issuer: 'LETHCON Academy',
      issueDate: '2024-03-15',
      expiryDate: '2026-03-15',
      description: 'Advanced certification for cloud infrastructure security',
      skills: ['AWS Security', 'Azure Security', 'Kubernetes Security', 'Cloud Compliance'],
      status: 'active',
      credentialId: 'LCSA-2024-001456'
    },
    {
      id: 6,
      title: 'Red Team Operations',
      issuer: 'LETHCON Academy',
      issueDate: '2024-04-01',
      expiryDate: '2026-04-01',
      description: 'Advanced red team tactics and adversary simulation',
      skills: ['C2 Frameworks', 'Lateral Movement', 'Persistence', 'Evasion Techniques'],
      status: 'active',
      credentialId: 'LRTO-2024-001789'
    },
    {
      id: 7,
      title: 'Security+ Equivalent',
      issuer: 'LETHCON Academy',
      issueDate: '2023-12-15',
      expiryDate: '2025-12-15',
      description: 'Comprehensive foundational security certification',
      skills: ['Cryptography', 'Access Control', 'Risk Management', 'Security Architecture'],
      status: 'active',
      credentialId: 'LSEP-2023-004321'
    },
    {
      id: 8,
      title: 'Advanced Malware Analysis',
      issuer: 'LETHCON Academy',
      issueDate: '2024-05-01',
      expiryDate: '2026-05-01',
      description: 'In-depth training on malware analysis and reverse engineering',
      skills: ['Static Analysis', 'Dynamic Analysis', 'IDA Pro', 'Ghidra', 'Yara Rules'],
      status: 'in-progress',
      progress: 65,
      requiredProgress: 100
    }
  ];

  const earnedCertificates = certificates.filter(c => c.status === 'active');
  const inProgressCertificates = certificates.filter(c => c.status === 'in-progress');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-htb-background border-r border-htb-selection-background flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Crown className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-htb-bright-white">Premium</h2>
          </div>

          <SidebarItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            onClick={() => navigate('/dashboard/premium')}
          />

          <SidebarItem
            icon={<Award className="h-5 w-5 text-yellow-400" />}
            label="Badges"
            onClick={() => navigate('/dashboard/premium/badges')}
          />

          <SidebarItem
            icon={<Medal className="h-5 w-5 text-amber-400" />}
            label="Achievements"
            onClick={() => navigate('/dashboard/premium/achievements')}
          />

          <SidebarItem
            icon={<Star className="h-5 w-5 text-green-400" />}
            label="Certificates"
            active
            onClick={() => navigate('/dashboard/premium/certificates')}
          />

          <div className="mt-6 pt-6 border-t border-htb-selection-background">
            <p className="px-4 text-xs text-htb-foreground uppercase tracking-wider mb-2">
              Training
            </p>
            <SidebarItem
              icon={<Target className="h-5 w-5" />}
              label="Red Team"
              onClick={() => navigate('/dashboard/red-team')}
            />
            <SidebarItem
              icon={<Shield className="h-5 w-5" />}
              label="Blue Team"
              onClick={() => navigate('/dashboard/blue-team')}
            />
            <SidebarItem
              icon={<Network className="h-5 w-5" />}
              label="Networking"
              onClick={() => navigate('/dashboard/networking')}
            />
            <SidebarItem
              icon={<Trophy className="h-5 w-5" />}
              label="Challenges"
              onClick={() => navigate('/challenges')}
            />
            <SidebarItem
              icon={<BookOpen className="h-5 w-5" />}
              label="Academy"
              onClick={() => navigate('/learning')}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FileCheck className="h-8 w-8 text-green-400" />
            <h1 className="text-4xl font-bold text-htb-bright-white">
              My Certificates
            </h1>
          </div>
          <p className="text-lg text-htb-foreground">
            Your professional certifications and achievements
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">{earnedCertificates.length}</div>
            <div className="text-htb-foreground">Certificates Earned</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">{inProgressCertificates.length}</div>
            <div className="text-htb-foreground">In Progress</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">8</div>
            <div className="text-htb-foreground">Total Skills Certified</div>
          </div>
          <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">2024</div>
            <div className="text-htb-foreground">First Certificate Year</div>
          </div>
        </div>

        {/* Earned Certificates */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-htb-bright-white mb-4">Earned Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {earnedCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-htb-selection-background/20 to-htb-selection-background/5 border border-htb-selection-background rounded-xl p-6 hover:border-green-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg flex items-center justify-center">
                      <FileCheck className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-htb-bright-white">{cert.title}</h3>
                      <p className="text-sm text-htb-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                    <Download className="h-4 w-4" />
                    <span className="text-sm">PDF</span>
                  </button>
                </div>

                <p className="text-sm text-htb-foreground mb-4">{cert.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-htb-selection-background/30 text-htb-bright-white text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 4 && (
                    <span className="px-2 py-1 bg-htb-selection-background/30 text-htb-foreground text-xs rounded-full">
                      +{cert.skills.length - 4} more
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm border-t border-htb-selection-background pt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-htb-foreground" />
                    <span className="text-htb-foreground">Issued:</span>
                    <span className="text-htb-bright-white">{cert.issueDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-htb-foreground" />
                    <span className="text-htb-foreground">Expires:</span>
                    <span className="text-htb-bright-white">{cert.expiryDate}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-htb-foreground">
                  Credential ID: <span className="text-htb-bright-white font-mono">{cert.credentialId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Certificates */}
        {inProgressCertificates.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-htb-bright-white mb-4">In Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgressCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-htb-selection-background/10 border border-htb-selection-background border-dashed rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg flex items-center justify-center">
                        <FileCheck className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-htb-bright-white">{cert.title}</h3>
                        <p className="text-sm text-htb-foreground">{cert.issuer}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-htb-foreground mb-4">{cert.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-htb-foreground">Progress</span>
                      <span className="text-htb-bright-white">{cert.progress}%</span>
                    </div>
                    <div className="w-full bg-htb-selection-background rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-htb-foreground">Estimated completion:</span>
                    <span className="text-htb-bright-white">2 weeks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumCertificates;

