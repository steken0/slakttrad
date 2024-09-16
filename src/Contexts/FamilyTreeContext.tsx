import React, { createContext, useContext, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export type Person = {
  id: string; // UUID-string
  name: string;
  gender?: "male" | "female";
  picture?: string; // URL to picture
  information?: string; // Additional information
  birthDate?: Date; // Date of birth
  deathDate?: Date; // Date of death, empty if alive
  mother?: string; // UUID of mother
  father?: string; // UUID of father
  children?: string[]; // UUIDs of children
};

export const defaultPerson: Person = {
  id: "",
  name: "",
};

type FamilyTreeContextType = {
  nodes: Map<string, Person>;
  entryPoints: string[];
  addNode: (person: Person) => void;
  removeNode: (personId: string) => void;
  removeNodeRecursively: (personId: string) => void;
  editNode: (personId: string, updatedData: Partial<Person>) => void;
};

const FamilyTreeContext = createContext<FamilyTreeContextType | undefined>(
  undefined
);

export const FamilyTreeProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [nodes, setNodes] = useState<Map<string, Person>>(new Map());

  // Calculate entry points
  const entryPoints = useMemo(() => {
    return Array.from(nodes.values())
      .filter((person) => !person.children || person.children.length === 0)
      .map((person) => person.id);
  }, [nodes]);

  const addNode = (person: Person) => {
    //Generate id
    person.id = uuidv4();
    setNodes((prevNodes) => new Map(prevNodes).set(person.id, person));
  };

  const removeNode = (personId: string) => {
    setNodes((prevNodes) => {
      const newNodes = new Map(prevNodes);
      const person = newNodes.get(personId);
      if (!person) return newNodes;

      // Make children childless
      if (person.children) {
        person.children.forEach((childId) => {
          const child = newNodes.get(childId);
          if (child) {
            if (child.mother === personId) child.mother = undefined;
            if (child.father === personId) child.father = undefined;
          }
        });
      }

      // Remove references from parents
      if (person.mother) {
        const mother = newNodes.get(person.mother);
        if (mother && mother.children) {
          mother.children = mother.children.filter(
            (childId) => childId !== personId
          );
        }
      }
      if (person.father) {
        const father = newNodes.get(person.father);
        if (father && father.children) {
          father.children = father.children.filter(
            (childId) => childId !== personId
          );
        }
      }

      // Delete the node
      newNodes.delete(personId);
      return newNodes;
    });
  };

  const removeNodeRecursively = (personId: string) => {
    const deleteRecursively = (id: string) => {
      const person = nodes.get(id);
      if (!person) return;
      // Delete children recursively
      if (person.children) {
        person.children.forEach((childId) => deleteRecursively(childId));
      }
      // Remove the node itself
      removeNode(id);
    };
    deleteRecursively(personId);
  };

  const editNode = (personId: string, updatedData: Partial<Person>) => {
    setNodes((prevNodes) => {
      const newNodes = new Map(prevNodes);
      const person = newNodes.get(personId);
      if (person) {
        newNodes.set(personId, { ...person, ...updatedData });
      }
      return newNodes;
    });
  };

  return (
    <FamilyTreeContext.Provider
      value={{
        nodes,
        entryPoints,
        addNode,
        removeNode,
        removeNodeRecursively,
        editNode,
      }}
    >
      {children}
    </FamilyTreeContext.Provider>
  );
};

export const useFamilyTree = () => {
  const context = useContext(FamilyTreeContext);
  if (context === undefined) {
    throw new Error("useFamilyTree must be used within a FamilyTreeProvider");
  }
  return context;
};
