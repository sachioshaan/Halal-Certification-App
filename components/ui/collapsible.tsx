"use client";

import * as React from "react";

interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  open: false,
  setOpen: () => {},
});

interface CollapsibleProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function Collapsible({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div
        className={className}
        data-state={open ? "open" : "closed"}
      >
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
}

function CollapsibleTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  const { open, setOpen } = React.useContext(CollapsibleContext);

  const handleClick = () => setOpen(!open);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

function CollapsibleContent({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(CollapsibleContext);

  if (!open) return null;

  return <div>{children}</div>;
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
