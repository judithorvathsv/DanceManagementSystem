export type DanceClassProp = {
    id: string;
    name: string;
    onClassUpdated?: (name: string) => void;
  };

  export type CreateDanceClassProp = {
    handleCreateClass: () => void;
    onClassCreated?: (name: string) => void;
  }