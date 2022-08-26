Imports System
Imports System.Threading.Tasks
Imports System.Collections.Generic
Imports System.Numerics
Imports Nethereum.Hex.HexTypes
Imports Nethereum.ABI.FunctionEncoding.Attributes
Imports Nethereum.Web3
Imports Nethereum.RPC.Eth.DTOs
Imports Nethereum.Contracts.CQS
Imports Nethereum.Contracts.ContractHandlers
Imports Nethereum.Contracts
Imports System.Threading
Imports IntellectualIdentityEthereum.Contracts.IP.ContractDefinition
Namespace IntellectualIdentityEthereum.Contracts.IP


    Public Partial Class IPService
    
    
        Public Shared Function DeployContractAndWaitForReceiptAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal iPDeployment As IPDeployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of TransactionReceipt)
        
            Return web3.Eth.GetContractDeploymentHandler(Of IPDeployment)().SendRequestAndWaitForReceiptAsync(iPDeployment, cancellationTokenSource)
        
        End Function
         Public Shared Function DeployContractAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal iPDeployment As IPDeployment) As Task(Of String)
        
            Return web3.Eth.GetContractDeploymentHandler(Of IPDeployment)().SendRequestAsync(iPDeployment)
        
        End Function
        Public Shared Async Function DeployContractAndGetServiceAsync(ByVal web3 As Nethereum.Web3.Web3, ByVal iPDeployment As IPDeployment, ByVal Optional cancellationTokenSource As CancellationTokenSource = Nothing) As Task(Of IPService)
        
            Dim receipt = Await DeployContractAndWaitForReceiptAsync(web3, iPDeployment, cancellationTokenSource)
            Return New IPService(web3, receipt.ContractAddress)
        
        End Function
    
        Protected Property Web3 As Nethereum.Web3.Web3
        
        Public Property ContractHandler As ContractHandler
        
        Public Sub New(ByVal web3 As Nethereum.Web3.Web3, ByVal contractAddress As String)
            Web3 = web3
            ContractHandler = web3.Eth.GetContractHandler(contractAddress)
        End Sub
    
        Public Function OwnerQueryAsync(ByVal ownerFunction As OwnerFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            Return ContractHandler.QueryAsync(Of OwnerFunction, String)(ownerFunction, blockParameter)
        
        End Function

        
        Public Function OwnerQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of String)
        
            return ContractHandler.QueryAsync(Of OwnerFunction, String)(Nothing, blockParameter)
        
        End Function



        Public Function StatusQueryAsync(ByVal statusFunction As StatusFunction, ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte)
        
            Return ContractHandler.QueryAsync(Of StatusFunction, Byte)(statusFunction, blockParameter)
        
        End Function

        
        Public Function StatusQueryAsync(ByVal Optional blockParameter As BlockParameter = Nothing) As Task(Of Byte)
        
            return ContractHandler.QueryAsync(Of StatusFunction, Byte)(Nothing, blockParameter)
        
        End Function



    
    End Class

End Namespace
