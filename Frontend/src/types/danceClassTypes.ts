export type DanceClassProp = {
    id: string;
    name: string;
  };

  export type CreateDanceClassProp = {
    handleCreateClass: () => void;
    onClassCreated?: (name: string) => void;
  }