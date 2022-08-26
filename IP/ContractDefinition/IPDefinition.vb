Imports System
Imports System.Threading.Tasks
Imports System.Collections.Generic
Imports System.Numerics
Imports Nethereum.Hex.HexTypes
Imports Nethereum.ABI.FunctionEncoding.Attributes
Imports Nethereum.Web3
Imports Nethereum.RPC.Eth.DTOs
Imports Nethereum.Contracts.CQS
Imports Nethereum.Contracts
Imports System.Threading
Namespace IntellectualIdentityEthereum.Contracts.IP.ContractDefinition

    
    
    Public Partial Class IPDeployment
     Inherits IPDeploymentBase
    
        Public Sub New()
            MyBase.New(DEFAULT_BYTECODE)
        End Sub
        
        Public Sub New(ByVal byteCode As String)
            MyBase.New(byteCode)
        End Sub
    
    End Class

    Public Class IPDeploymentBase 
            Inherits ContractDeploymentMessage
        
        Public Shared DEFAULT_BYTECODE As String = "6080604052600080546001600160a01b0319163317905560e4806100246000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c8063200d2ed21460375780638da5cb5b14605e575b600080fd5b600054604a90600160a01b900460ff1681565b604051605591906087565b60405180910390f35b6000546070906001600160a01b031681565b6040516001600160a01b0390911681526020016055565b602081016004831060a857634e487b7160e01b600052602160045260246000fd5b9190529056fea264697066735822122027104f61d3eae81e2dab27370d3a152876002dc4b76c62c8468994b74564bc5c64736f6c63430008100033"
        
        Public Sub New()
            MyBase.New(DEFAULT_BYTECODE)
        End Sub
        
        Public Sub New(ByVal byteCode As String)
            MyBase.New(byteCode)
        End Sub
        

    
    End Class    
    
    Public Partial Class OwnerFunction
        Inherits OwnerFunctionBase
    End Class

        <[Function]("owner", "address")>
    Public Class OwnerFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class StatusFunction
        Inherits StatusFunctionBase
    End Class

        <[Function]("status", "uint8")>
    Public Class StatusFunctionBase
        Inherits FunctionMessage
    

    
    End Class
    
    
    Public Partial Class OwnerOutputDTO
        Inherits OwnerOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class OwnerOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("address", "", 1)>
        Public Overridable Property [ReturnValue1] As String
    
    End Class    
    
    Public Partial Class StatusOutputDTO
        Inherits StatusOutputDTOBase
    End Class

    <[FunctionOutput]>
    Public Class StatusOutputDTOBase
        Implements IFunctionOutputDTO
        
        <[Parameter]("uint8", "", 1)>
        Public Overridable Property [ReturnValue1] As Byte
    
    End Class
End Namespace
