import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // Estados para el nombre del cliente, fecha de reserva, lista de clientes, y visibilidad del modal
  const [nombre, setNombre] = useState('');
  const [fechaReserva, setFechaReserva] = useState(new Date());
  const [clientes, setClientes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cantidad, setCantidad] = useState('')

  // Estados para el datetimepicker
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Función para cambiar la fecha seleccionada en el datetimepicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || fechaReserva; // Si no se selecciona ninguna fecha, se mantiene la actual
    setShowDatePicker(false); // Oculta el datetimepicker
    setFechaReserva(currentDate); // Establece la fecha de reserva seleccionada en el estado
  };

  // Función para mostrar el datetimepicker con el modo especificado (date o time)
  const showMode = (currentMode) => {
    setShow(true); // Muestra el datetimepicker
    setMode(currentMode); // Establece el modo del datetimepicker
  };

  // Función para mostrar el datetimepicker en modo fecha
  const showDatepicker = () => {
    showMode('date');
  };

  // Función para agregar un nuevo cliente
  const agregarCliente = () => {
    // Genera un nuevo cliente con un ID único (incrementa el último ID generado)
    const nuevoCliente = { id: clientes.length + 1, nombre: nombre, fechaReserva: fechaReserva, cantidad: cantidad };
    // Agrega el nuevo cliente a la lista de clientes
    setClientes([...clientes, nuevoCliente]);
    // Limpia los campos de entrada
    setNombre('');
    setCantidad('');
    setFechaReserva(new Date());
    // Oculta el modal de agregar cliente
    setModalVisible(false);
  };

  // Función para eliminar un cliente
  const eliminarCliente = (id) => {
    // Filtra la lista de clientes para excluir el cliente con el ID dado
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  };

  const handleCantidadChange = (text) => {
    // Remover cualquier carácter que no sea un número
    const numericValue = text.replace(/[^0-9]/g, '');
    // Actualizar el estado
    setCantidad(numericValue);
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar cliente */}
        <TouchableOpacity 
          style={[styles.addbutton, { backgroundColor: '#F08080' }]} 
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Agregar Cliente</Text>
        </TouchableOpacity>
      {/* Modal de agregar cliente */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del cliente */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del Cliente"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={cantidad}
              onChangeText={handleCantidadChange}
              keyboardType="numeric"
            />
              {/* Botón para mostrar el datetimepicker */}
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateinput}>
                <Text style={styles.dateinputText}>Seleccionar fecha de Reserva</Text>
              </TouchableOpacity>
              {/* Muestra la fecha seleccionada */}
              <Text>Fecha seleccionada: {fechaReserva.toLocaleDateString()}</Text>
              {/* Muestra el datetimepicker si la variable showDatePicker es verdadera */}
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={fechaReserva}
                  mode="date"
                  is24Hour={false}
                  display="default"
                  onChange={onChange}
                  locale='es-ES' // Establece el idioma del datetimepicker a español
                />
              )}
            {/* Botón para agregar el cliente */}
            <Button title="Agregar Cliente" onPress={agregarCliente} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de clientes */}
      <FlatList
        data={clientes}
        renderItem={({ item }) => (
          <View
            style={styles.clienteItem}
          >
            
            {/* Muestra el ID, nombre y fecha de reserva del cliente */}
            <Text style={styles.clienteNombre}>{item.id}</Text>
            <Text style={styles.clienteNombre}>{item.nombre}</Text>
            <Text style={styles.clienteFecha}>{item.cantidad} Personas</Text>
            <Text style={styles.clienteFecha}>
              Fecha de Reserva: {item.fechaReserva.toDateString()}
            </Text>
            <TouchableOpacity style={styles.botoneliminar} onPress={() => eliminarCliente(item.id)}>
              <Text style={styles.botoneliminarTexto}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Extrae el ID de cada cliente como clave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginTop:5
  },
  clienteNombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clienteFecha: {
    fontSize: 16,
  },
  addbutton: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateinput:{
    backgroundColor: "#F8AD9D",
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: 5,
    color: "white",
    marginBottom: 5
  },
  dateinputText: {
    color: 'white'
  },
  botoneliminar: {
    backgroundColor: '#F08080',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    width: '30%',
    alignItems: 'center'
  },
  botoneliminarTexto: {
    fontWeight: 'bold',
    color: 'white'
  }
});

export default App;
