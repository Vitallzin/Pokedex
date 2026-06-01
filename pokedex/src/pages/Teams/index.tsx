import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTeam } from '../../contexts/TeamContext';
import { TeamCard } from '../../components/team/TeamCard';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import './style.css';

export const Teams: React.FC = () => {
  const { teams, addTeam, deleteTeam } = useTeam();
  // Novo nome do time sendo criado
  const [newTeamName, setNewTeamName] = useState('');
  // Controla exibição do formulário de novo time
  const [showAdd, setShowAdd] = useState(false);
  // Time aguardando confirmação de exclusão
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);

  // Cria novo time validando nome vazio
  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      addTeam(newTeamName.trim());
      setNewTeamName('');
      setShowAdd(false);
    }
  };

  // Confirma exclusão de time
  const confirmDelete = () => {
    if (teamToDelete) {
      deleteTeam(teamToDelete);
      setTeamToDelete(null);
    }
  };

  return (
    <div className="teams-page">
      <div className="teams-header">
        <div>
          <h2>Meus Times</h2>
          <p>Crie e gerencie seus times de batalha.</p>
        </div>
        {!showAdd && (
          <Button onClick={() => setShowAdd(true)} icon={<Plus size={20} />}>
            Novo Time
          </Button>
        )}
      </div>

      {showAdd && (
        <Card className="add-team-card" padding="md">
          <form className="add-team-form" onSubmit={handleAddTeam}>
            <div className="form-header">
              <h3>Novo Time</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>
                <X size={20} />
              </Button>
            </div>
            <div className="form-body">
              <Input 
                type="text" 
                placeholder="Ex: Time de Elite, Iniciais, etc." 
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                autoFocus
                label="Nome do Time"
              />
              <div className="form-actions">
                <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancelar</Button>
                <Button type="submit">Criar Time</Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      <div className="teams-list">
        {teams.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛡️</div>
            <p>Você ainda não criou nenhum time.</p>
            <Button variant="outline" onClick={() => setShowAdd(true)}>Começar agora</Button>
          </div>
        ) : (
          <div className="teams-grid">
            {teams.map(team => (
              <TeamCard 
                key={team.id} 
                team={team} 
                onDelete={(id) => setTeamToDelete(id)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!teamToDelete}
        onClose={() => setTeamToDelete(null)}
        title="Confirmar Exclusão"
        size="sm"
        footer={
          <div className="delete-modal-footer">
            <Button variant="secondary" onClick={() => setTeamToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Apagar
            </Button>
          </div>
        }
      >
        <div className="delete-modal-content">
          <p>Tem certeza que deseja apagar este time? Esta ação não pode ser desfeita.</p>
        </div>
      </Modal>
    </div>
  );
};
