import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsSection = ({ title, icon, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-background border border-border rounded-lg mb-4 overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface transition-colors duration-150"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={20} className="text-accent" />
          <span className="font-medium text-text-primary">{title}</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary transition-transform duration-150"
        />
      </Button>
      
      {isExpanded && (
        <div className="border-t border-border-light p-4 bg-surface/30">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingsSection;