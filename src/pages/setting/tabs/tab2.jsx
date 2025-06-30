import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { CaracteristicasForm } from "./caracteristicas";
import { SelectBaseOmie } from "../../../components/selectBaseOmie";

export function Tab2({ settings, defaultBaseOmie }) {
  const [baseOmie, setBaseOmie] = useState(defaultBaseOmie);

  const settingsPerBaseOmie = settings?.filter(
    (e) => e?.baseOmie?._id === baseOmie
  );

  return (
    <Box>
      <Box mt="2">
        <SelectBaseOmie
          defaultValue={[baseOmie]}
          w="xs"
          variant=""
          rounded="xs"
          borderBottom="1px solid"
          borderBottomColor="gray.200"
          onChange={(e) => {
            setBaseOmie(e.target.value);
          }}
        />
      </Box>

      <Box mt="6">
        {baseOmie && (
          <CaracteristicasForm
            title="Características do sistema por base omie"
            initialSettings={settingsPerBaseOmie}
            baseOmie={baseOmie}
          />
        )}
      </Box>
    </Box>
  );
}
