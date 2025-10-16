# 💰 Métodos de pago actualizados

## ✅ **Nuevo entendimiento de `paymentCondition`:**

**`paymentCondition`** se refiere al **método de pago**, no al tipo de crédito:

### **Opciones disponibles:**
- `EFECTIVO` - Pago en efectivo
- `TARJETA` - Tarjeta de crédito/débito  
- `TRANSFERENCIA` - Transferencia bancaria
- `CHEQUE` - Pago con cheque
- `CONTADO` - Contado (efectivo inmediato)
- `CREDITO` - Crédito (pago posterior)

### **Ejemplo de JSON actualizado:**

```json
{
  "paymentCondition": "EFECTIVO",
  "receiver": {
    "customerName": "Juan Carlos",
    "customerLastname": "Rodríguez",
    "customerDocument": "12345678-9",
    "customerAddress": "Col. Escalón, Calle Principal #45, San Salvador",
    "customerEmail": "juan.rodriguez@example.com",
    "customerPhone": "7777-8888"
  },
  "products": [
    { "productId": 1, "requestedQuantity": 2 },
    { "productId": 2, "requestedQuantity": 1 },
    { "productId": 3, "requestedQuantity": 3 }
  ],
  "withheldIva": 0.0
}
```

### **Respuesta esperada del backend:**
El backend devuelve la misma estructura que mostraste, incluyendo:
- `generationCode` - Código único de la factura
- `controlNumber` - Número de control DTE  
- `transmitter` - Datos de Becky's Florist
- `receiver` - Datos del cliente
- `products` - Lista completa con precios y subtotales
- `totalWithIva` - Total final con IVA incluido

### **Cambios implementados:**
1. ✅ Label cambiado de "Condición de pago" a "Método de pago"
2. ✅ Placeholder actualizado para ser más claro
3. ✅ Opciones ampliadas: EFECTIVO, TARJETA, TRANSFERENCIA, CHEQUE, CONTADO, CREDITO
4. ✅ Comentario en DTO para aclarar el propósito del campo
5. ✅ Formulario actualizado con las nuevas opciones