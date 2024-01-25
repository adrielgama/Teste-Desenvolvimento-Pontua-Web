import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'

interface AgentProviderProps {
  children: ReactNode
}

interface Agent {
  value: string
  label: string
  img: string
}

interface IAgentContextData {
  selectedAgent: Agent | null
  selectAgent: (agent: Agent | null) => void
}

const AgentContext = createContext({} as IAgentContextData)

export const useAgentContext = () => useContext(AgentContext)

export const AgentProvider: React.FC<AgentProviderProps> = ({ children }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const selectAgent = useCallback((agent: Agent | null) => {
    setSelectedAgent(agent)
  }, [])

  const value = useMemo(
    () => ({ selectedAgent, selectAgent }),
    [selectedAgent, selectAgent]
  )

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
}
