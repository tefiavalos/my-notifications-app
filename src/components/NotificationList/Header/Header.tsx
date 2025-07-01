import React from 'react';
import { ButtonRow, HeaderRow, Title, HeaderButton, HeaderButtonText, HeaderButtonDanger } from './Header.styles';

interface HeaderProps {
  showFilters: boolean;
  onSimulateNotification: () => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showFilters,
  onSimulateNotification,
  onToggleFilters,
  onClearFilters,
  hasActiveFilters,
}) => (
  <>
    <HeaderRow>
      <Title>Notificaciones</Title>
    </HeaderRow>
    <ButtonRow>
      <HeaderButton onPress={onSimulateNotification}>
        <HeaderButtonText>Simular notificación</HeaderButtonText>
      </HeaderButton>
      <HeaderButton onPress={onToggleFilters}>
        <HeaderButtonText>
          {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
        </HeaderButtonText>
      </HeaderButton>
      {hasActiveFilters && (
        <HeaderButtonDanger onPress={onClearFilters}>
          <HeaderButtonText>Limpiar filtros</HeaderButtonText>
        </HeaderButtonDanger>
      )}
    </ButtonRow>
  </>
);

export default Header; 