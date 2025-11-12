namespace GsSoa.Exceptions;

public class ResourceNotFoundException : Exception
{
    public ResourceNotFoundException(string message) : base(message)
    {
    }

    public ResourceNotFoundException(string resourceName, long id) 
        : base($"{resourceName} com ID {id} não foi encontrado(a)")
    {
    }
}
